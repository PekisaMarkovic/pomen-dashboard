const FileIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none" {...props}>
      <g>
        <path
          d="M21.5 19V5C21.5 3.9 20.6 3 19.5 3H5.5C4.4 3 3.5 3.9 3.5 5V19C3.5 20.1 4.4 21 5.5 21H19.5C20.6 21 21.5 20.1 21.5 19ZM9.4 13.98L11.5 16.51L14.6 12.52C14.8 12.26 15.2 12.26 15.4 12.53L18.91 17.21C19.16 17.54 18.92 18.01 18.51 18.01H6.52C6.1 18.01 5.87 17.53 6.13 17.2L8.62 14C8.81 13.74 9.19 13.73 9.4 13.98Z"
          fill="#64748B"
        />
      </g>
      <defs>
        <rect width="24" height="24" fill="white" transform="translate(0.5)" />
      </defs>
    </svg>
  )
}

export default FileIcon
