import { FormKitSchemaNode } from '@formkit/core'
export function buildPrefix(content: string): Partial<FormKitSchemaNode> {
  return {
    $el: 'div',
    attrs: {
      style: {
        padding: '1rem',
        'background-color': '#fafafc',
      },
    },
    children: content,
  }
}
