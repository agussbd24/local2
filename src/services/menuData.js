export const categories = [
  { id: 'all', label: 'Todo' },
  { id: 'hamburguesas', label: 'Hamburguesas' },
  { id: 'entradas', label: 'Entradas' },
  { id: 'papas', label: 'Papas' },
  { id: 'bebidas', label: 'Bebidas' },
  { id: 'postres', label: 'Postres' },
]

export const products = [
  {
    id: 'burger-brasa',
    category: 'hamburguesas',
    name: 'Brasa Signature',
    description: 'Doble smash, cheddar madurado, panceta ahumada, cebolla crispy y salsa brasa.',
    price: 11800,
    image:
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=85',
    badge: 'Top seller',
  },
  {
    id: 'burger-trufa',
    category: 'hamburguesas',
    name: 'Black Truffle Burger',
    description: 'Blend premium, hongos salteados, provolone, rúcula y mayo de trufa.',
    price: 14600,
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=85',
    badge: 'Premium',
  },
  {
    id: 'burger-tesla',
    category: 'hamburguesas',
    name: 'Neon Cheese',
    description: 'Triple cheddar, pepinillos, cebolla morada y salsa secreta de la casa.',
    price: 13200,
    image:
      'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=1200&q=85',
    badge: 'Nueva',
  },
  {
    id: 'burger-veggie',
    category: 'hamburguesas',
    name: 'Garden Smash',
    description: 'Medallón vegetal, cheddar, palta, tomate asado, lechuga y alioli cítrico.',
    price: 11900,
    image:
      'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'burger-bbq',
    category: 'hamburguesas',
    name: 'Smoky BBQ',
    description: 'Doble carne, bacon crocante, aros de cebolla, queso cheddar y salsa BBQ ahumada.',
    price: 12800,
    image:
      'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=1200&q=85',
    badge: 'Popular',
  },
  {
    id: 'entrada-nuggets',
    category: 'entradas',
    name: 'Chicken Bites',
    description: 'Bocados de pollo crocante con mostaza dulce y dip BBQ ahumado.',
    price: 8400,
    image:
      'https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'entrada-mozzarella',
    category: 'entradas',
    name: 'Mozzarella Sticks',
    description: 'Bastones de muzza dorados, salsa pomodoro especiada y albahaca fresca.',
    price: 7900,
    image:
      'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'entrada-onion',
    category: 'entradas',
    name: 'Aros Onion Glow',
    description: 'Aros de cebolla extra crispy con lluvia de ciboulette y dip ranch.',
    price: 7200,
    image:
      'https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'entrada-empanadas',
    category: 'entradas',
    name: 'Empanadas Gourmet',
    description: 'Tres empanadas artesanales: carne, pollo y caprese. con chimichurri.',
    price: 7800,
    image:
      'https://images.unsplash.com/photo-1604467707321-70d009801bf4?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'papas-classic',
    category: 'papas',
    name: 'Papas House',
    description: 'Papas bastón doble cocción, sal marina, chimichurri seco y dip de la casa.',
    price: 6200,
    image:
      'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'papas-cheddar',
    category: 'papas',
    name: 'Loaded Cheddar',
    description: 'Papas con cheddar fundido, panceta ahumada, verdeo y jalapeños suaves.',
    price: 9100,
    image:
      'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=1200&q=85',
    badge: 'Para compartir',
  },
  {
    id: 'papas-pulled',
    category: 'papas',
    name: 'Pulled Fries',
    description: 'Papas crocantes con pulled pork braseado, BBQ, crema ácida y verdeo.',
    price: 10400,
    image:
      'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'papas-trufa',
    category: 'papas',
    name: 'Truffle Fries',
    description: 'Papas finas con aceite de trufa, queso parmesano y hierbas frescas.',
    price: 9800,
    image:
      'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1200&q=85',
    badge: 'Chef',
  },
  {
    id: 'bebida-limonada',
    category: 'bebidas',
    name: 'Limonada Menta Jengibre',
    description: 'Limonada fresca con menta, jengibre y almíbar liviano.',
    price: 3600,
    image:
      'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'bebida-cola',
    category: 'bebidas',
    name: 'Cola 350 ml',
    description: 'Bebida cola bien fría, clásica o sin azúcar.',
    price: 2900,
    image:
      'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'bebida-ipa',
    category: 'bebidas',
    name: 'IPA Tirada',
    description: 'Pinta de cerveza IPA artesanal, amarga, cítrica y aromática.',
    price: 5200,
    image:
      'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'bebida-smoothie',
    category: 'bebidas',
    name: 'Smoothie Tropical',
    description: 'Mix de mango, maracuyá, banana y yogur natural. Refrescante.',
    price: 4200,
    image:
      'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'postre-brownie',
    category: 'postres',
    name: 'Brownie Ahumado',
    description: 'Brownie tibio, helado de vainilla, sal marina y salsa de chocolate.',
    price: 6500,
    image:
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=85',
    badge: 'Imperdible',
  },
  {
    id: 'postre-cheesecake',
    category: 'postres',
    name: 'Cheesecake Frutos Rojos',
    description: 'Base crocante, crema suave y compota de frutos rojos.',
    price: 6900,
    image:
      'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'postre-helado',
    category: 'postres',
    name: 'Helado Artesanal',
    description: 'Tres bolas de helado artesanal a elección con toppings a elegir.',
    price: 5400,
    image:
      'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=1200&q=85',
  },
]

export function formatCurrency(value) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(value)
}
