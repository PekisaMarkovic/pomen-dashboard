export const checkIsLinkActiv = (pathname: string, link: string) => {
  const splited = pathname.split('/')

  return splited.includes(link.replace('/', ''))
}
