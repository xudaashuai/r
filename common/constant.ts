export const REDIRECTOR_DOMAIN = process.env.DOMAIN ?? 'localhost'
export const UI_PREFIX = process.env.UI_PREFIX ?? 'r'
export const UI_DOMAIN = `${process.env.UI_PREFIX}.${REDIRECTOR_DOMAIN}`
