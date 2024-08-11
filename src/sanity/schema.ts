import { type SchemaTypeDefinition } from 'sanity'
import instructor from './schemas/instructor'
import course from './schemas/course'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [instructor, course],
}
