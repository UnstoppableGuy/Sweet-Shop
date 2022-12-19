import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader
    className="product-block non-block"
    speed={2}
    width={280}
    height={410}
    viewBox="0 0 280 410"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="32" ry="32" width="260" height="270" /> 
    <rect x="0" y="275" rx="5" ry="5" width="260" height="20" /> 
    <rect x="0" y="300" rx="0" ry="0" width="260" height="50" /> 
    <rect x="130" y="355" rx="30" ry="50" width="120" height="40" /> 
    <rect x="15" y="360" rx="14" ry="14" width="80" height="30" />
  </ContentLoader>
)

export default MyLoader

