import React from 'react'

export default function Review() {
    const today = new Date();

    return (
        <div>
            <h1>Givealittle</h1>
            <p>Copyright &copy; {today.getFullYear()}</p>
        </div>
    )
}