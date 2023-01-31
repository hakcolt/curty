export default function ({ className, size }) {
  return (
    <div className={className}
      style={ {
        background: `url("/images/logo.svg") no-repeat center`,
        backgroundSize: size
      } }></div>
  )
}