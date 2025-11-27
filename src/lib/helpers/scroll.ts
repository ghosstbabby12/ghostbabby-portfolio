export const scrollToElement = (selector: string): void => {
  const element = document.querySelector(selector)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

export const scrollToTop = (): void => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
