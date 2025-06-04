import { mount } from 'svelte'
import './app.css'
import User from './User.svelte'


const user = mount(User, {
  target: document.getElementById('user'),
})

export default user
