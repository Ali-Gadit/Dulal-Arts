export default {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'shortDescription', title: 'Short Description', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'image', title: 'Cover Image', type: 'image', fields: [{ name: 'alt', title: 'Alt text', type: 'string' }] },
    { 
      name: 'category', 
      title: 'Category', 
      type: 'string',
      options: {
        list: [
          { title: 'DIY kits', value: 'DIY kits' },
          { title: 'Pretty Little Decor', value: 'Pretty Little Decor' },
          { title: 'Gifts', value: 'Gifts' },
          { title: 'Wrapping & Packaging Services', value: 'Wrapping & Packaging Services' }
        ]
      }
    },
    { name: 'featured', title: 'Featured', type: 'boolean', initialValue: false },
    { name: 'order', title: 'Order', type: 'number' }
  ]
}
