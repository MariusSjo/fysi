// client.js
import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: 'mvjavj3j', 
  dataset: 'production', 
  apiVersion: '2023-02-01', // use a UTC date string
  useCdn: true
})