export default {
  name: 'testimonial',
  title: 'Customer Feedback',
  type: 'document',
  fields: [
    { 
      name: 'customerName', 
      title: 'Customer Name', 
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    { 
      name: 'stars', 
      title: 'Star Count', 
      type: 'number',
      description: 'Number of stars from 1 to 5',
      validation: (Rule: any) => Rule.required().min(1).max(5),
      initialValue: 5
    },
    { 
      name: 'review', 
      title: 'What they say', 
      type: 'text',
      validation: (Rule: any) => Rule.required()
    },
    { 
      name: 'order', 
      title: 'Order', 
      type: 'number',
      description: 'Order of display (lower numbers appear first)'
    }
  ]
}
