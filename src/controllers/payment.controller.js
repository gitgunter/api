import lemonSqueezyAxiosInstance from '../config/lemonsqueezy.config.js';
import paymentService from '../services/payment.service.js';

const createOrder = async (req, res) => {
  const userData = req.body;
  const orderData = await lemonSqueezyAxiosInstance.post('/checkouts', {
    data: {
      type: 'checkouts',
      attributes: {
        checkout_options: {
          dark: true,
        },
        checkout_data: {
          billing_address: {
            country: 'CR',
          },
          custom: {
            user_order_id: userData.user_order_id,
            user_order_email: userData.user_order_email,
          },
        },
        product_options: {
          redirect_url: `http://localhost:5173/novedades?order_validation=true&user_order_id=${userData.user_order_id}&user_email=${userData.user_order_email}`,
        },
      },
      relationships: {
        store: {
          data: {
            type: 'stores',
            id: '81221',
          },
        },
        variant: {
          data: {
            type: 'variants',
            id: '331869',
          },
        },
      },
    },
  });
  
  const orderURL = orderData.data.data.attributes.url;
  return res.status(200).json(orderURL);
};

const lemonSqueezyWebhook = async (req, res) => {
  const eventData = req.body;

  // Verificar la firma del webhook para asegurar que el evento es legítimo

  // Procesar el evento, por ejemplo, actualizar el estado de una orden en la base de datos

  const order = eventData.data.attributes;

  const orderData = {
    order_number: order.order_number,
    total: order.total,
    status: order.status,
    payment_status: 'completed',
    user_email: order.user_email,
    user_name: order.user_name,
  };

  const [result, error] = await paymentService.createOrder(orderData);

  if (error) {
    return res.status(500).send('Error inserting order');
  }

  if (result.affectedRows > 0) {
    console.log('Evento de webhook recibido');
    res.status(200).send('Evento procesado');
  }
};

export default { createOrder, lemonSqueezyWebhook };
