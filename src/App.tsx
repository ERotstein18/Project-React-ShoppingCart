import { useState } from 'react'
import { useQuery } from 'react-query'

//Components
import Item from './Item/Item';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';


//Styles
import { Wrapper, StyledButton } from './App.styles'

//Types
export type CartItemType = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  amount: number
}

const getProducts = async ():Promise<CartItemType[]> => {
  const response = await fetch('https://fakestoreapi.com/products')
  const data = await response.json()
  return data
}
const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts
  );
  console.log(data)

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0)
  
  const handleAddToCart = (clickedItem: CartItemType) =>
    setCartItems(prev => {
      const isItemInCart = prev.find(item => item.id === clickedItem.id)

      if (isItemInCart) {
        return prev.map(item => 
          item.id === clickedItem.id
          ? { ...item, amount: item.amount + 1 }
          : item
        )
      }
      return [...prev, { ...clickedItem, amount: 1 }]
    })
  
  const handleRemoveFromCart = () => null

  if(isLoading) return <LinearProgress />
  if (error) return <div>Something went wrong!</div>
  
  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        Cart goes here!
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCart />
        </Badge>
      <StyledButton />
      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
