import { watchEffect } from 'vue'

const SITE = 'Charmivolt'
const BASE_URL = 'https://charmivolt.netlify.app'
const DEFAULT_DESC = 'Mini Bags, Bags y Charms únicos con estilo gótico y y2k. Envíos a toda Argentina por Correo Argentino.'
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`

interface SeoOptions {
  title: string
  description?: string
  image?: string
  noSuffix?: boolean
}

function setMeta(selector: string, content: string): void {
  let el = document.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    const [attr, value] = selector.replace('meta[', '').replace(']', '').split('="')
    el = document.createElement('meta')
    el.setAttribute(attr, value.replace('"', ''))
    document.head.appendChild(el)
  }
  el.content = content
}

export function useSeo(options: SeoOptions | (() => SeoOptions)): void {
  watchEffect(() => {
    const opts = typeof options === 'function' ? options() : options
    const title = opts.noSuffix ? opts.title : `${opts.title} | ${SITE}`
    const description = opts.description ?? DEFAULT_DESC
    const image = opts.image ?? DEFAULT_IMAGE

    document.title = title

    setMeta('meta[name="description"]', description)
    setMeta('meta[property="og:title"]', title)
    setMeta('meta[property="og:description"]', description)
    setMeta('meta[property="og:image"]', image)
    setMeta('meta[name="twitter:title"]', title)
    setMeta('meta[name="twitter:description"]', description)
    setMeta('meta[name="twitter:image"]', image)
  })
}
