import { mount } from 'svelte'
import './app.css'
import Stats from './Stats.svelte'


const stats = mount(Stats, {
  target: document.getElementById('stats'),
})

export default stats
