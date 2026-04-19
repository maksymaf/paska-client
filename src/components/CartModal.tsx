import { useState } from 'react';
import { useCartStore } from '../../store/cartStore';
import Button from './ui/Button';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'cart' | 'form' | 'success';

interface FormFields {
  name: string;
  phone: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
}

function validateForm(fields: FormFields): FormErrors {
  const errors: FormErrors = {};

  if (!fields.name.trim()) {
    errors.name = "Імʼя обовʼязкове";
  } else if (fields.name.trim().length < 2) {
    errors.name = "Мінімум 2 символи";
  }

  const phoneClean = fields.phone.replace(/\s/g, '');
  const phoneRegex = /^(\+?38)?0\d{9}$/;
  if (!phoneClean) {
    errors.phone = "Телефон обовʼязковий";
  } else if (!phoneRegex.test(phoneClean)) {
    errors.phone = "Формат: 0XXXXXXXXX або +380XXXXXXXXX";
  }

  return errors;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, removeItem, clearCart } = useCartStore();
  const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

  const [step, setStep] = useState<Step>('cart');
  const [form, setForm] = useState<FormFields>({ name: '', phone: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  if (!isOpen) return null;

  function handleClose() {
    onClose();
    setStep('cart');
    setForm({ name: '', phone: '' });
    setErrors({});
    setServerError('');
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit() {
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setServerError('');
// https://paska-backend.onrender.com

    try {
      const res = await fetch('https://paska-backend.onrender.com/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          items,
          total,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Помилка сервера');
      }

      clearCart();
      setStep('success');
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Щось пішло не так');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl border-2 border-accent/30 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        {step === 'cart' && (
          <>
            <p className="font-bold text-xl text-center">🛒 Ваша корзина</p>

            {items.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Корзина порожня</p>
            ) : (
              <>
                <div className="flex flex-col gap-3 max-h-80 overflow-y-auto no-scrollbar">
                  {items.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-3 border-b border-gray-100 pb-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-xl"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-sm line-clamp-1">{item.name}</p>
                        <p className="text-accent font-semibold">
                          {item.price} грн × {item.quantity}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item._id)}
                        className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer text-xl"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center font-bold text-lg border-t border-gray-100 pt-3">
                  <span>Разом:</span>
                  <span className="text-accent">{total} грн.</span>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={clearCart} className="flex-1">
                    Очистити
                  </Button>
                  <Button variant="filled" onClick={() => setStep('form')} className="flex-1">
                    Оформити
                  </Button>
                </div>
              </>
            )}
          </>
        )}

        {step === 'form' && (
          <>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setStep('cart')}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer text-lg leading-none"
              >
                ←
              </button>
              <p className="font-bold text-xl flex-1 text-center pr-5">📋 Оформлення</p>
            </div>

            <div className="flex justify-between text-sm text-gray-500 border-b border-gray-100 pb-3">
              <span>{items.length} товар(ів)</span>
              <span className="font-semibold text-accent">{total} грн.</span>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">
                  Імʼя <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Іван Франко"
                  className={`border-2 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors
                    ${errors.name
                      ? 'border-red-400 focus:border-red-500'
                      : 'border-gray-200 focus:border-accent'
                    }`}
                />
                {errors.name && (
                  <p className="text-red-400 text-xs">{errors.name}</p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">
                  Телефон <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="0991234567"
                  className={`border-2 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors
                    ${errors.phone
                      ? 'border-red-400 focus:border-red-500'
                      : 'border-gray-200 focus:border-accent'
                    }`}
                />
                {errors.phone && (
                  <p className="text-red-400 text-xs">{errors.phone}</p>
                )}
              </div>
            </div>

            {serverError && (
              <p className="text-red-500 text-sm text-center bg-red-50 rounded-xl py-2 px-3">
                ⚠️ {serverError}
              </p>
            )}

            <Button
              variant="filled"
              onClick={handleSubmit}
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Відправляємо...' : 'Підтвердити замовлення'}
            </Button>
          </>
        )}

        {step === 'success' && (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <div className="text-6xl animate-bounce">🎉</div>
            <p className="font-bold text-2xl text-gray-800">Дякуємо!</p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Ваше замовлення прийнято.<br />
              Ми звʼяжемось з вами найближчим часом.
            </p>
            <Button variant="filled" onClick={handleClose} className="mt-2">
              Закрити
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
