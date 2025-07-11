import React from "react"
import { Helmet} from  "react-helmet";

const MetaData = ({title}) => {
    return (
      <Helmet>{`${title} - Ekommerce`}</Helmet>  
    )
}

export default MetaData;