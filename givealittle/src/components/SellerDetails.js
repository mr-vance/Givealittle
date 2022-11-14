import React from 'react'
import '../components/SellersPage.css'


function SellerDetails({Name, Email, Cell}) {
  return (
    <div className='seller-details-container'>
        <h1 className='detail'>Name: <span className='detail-bg'>{Name}</span></h1>
        <h1 className='detail'>Email: <span className='detail-bg'>{Email}</span></h1>
        <h1 className='detail'>Cell: <span className='detail-bg'>{Cell}</span></h1>
    </div>
  )
}

export default SellerDetails