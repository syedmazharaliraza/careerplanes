import { defineField, defineType } from "sanity";

export default defineType({
  name: "course",
  title: "Course",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().min(5).max(100),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "discountedPrice",
      title: "Discounted Price",
      type: "number",
      validation: (Rule) =>
        Rule.custom((discountedPrice, context) => {
          const price = context.document?.price as number;
          if (discountedPrice && discountedPrice >= price) {
            return "Discounted price must be less than the original price";
          }
          return true;
        }).min(0),
    }),
    defineField({
      name: "duration",
      title: "Duration (Minutes)",
      type: "number",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "instructor",
      title: "Instructor",
      type: "array",
      of: [{ type: "reference", to: { type: "instructor" } }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "videoUrl",
      title: "Intro Video URL",
      type: "url",
    }),
    defineField({
      name: "syllabus",
      title: "Syllabus",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (Rule) => Rule.min(0).max(5),
    }),
    defineField({
      name: "reviewsCount",
      title: "Reviews Count",
      type: "number",
    }),
    defineField({
      name: "isPopular",
      title: "Is Popular Course?",
      type: "boolean",
    }),
  ],

  preview: {
    select: {
      title: "title",
      instructor: "instructor.name",
      media: "thumbnail",
    },
    prepare(selection) {
      const { instructor } = selection;
      return { ...selection, subtitle: instructor && `by ${instructor}` };
    },
  },
});
