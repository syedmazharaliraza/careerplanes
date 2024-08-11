import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'instructor',
  title: 'Instructor',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text'
    }),
    defineField({
      name: 'profilePicture',
      title: 'Profile Picture',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ]
    })
  ],

  preview: {
    select: {
      title: 'name',
      media: 'profilePicture'
    }
  }
})
