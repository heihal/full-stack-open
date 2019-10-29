import React from 'react'


const PersonForm=({lisaaTyyppi,newName,handlaaTyyppi,newNumber,handlaaNumba})=>

    (
<form onSubmit={lisaaTyyppi}>
<div>
    name: <input
                value = {newName}
                onChange={handlaaTyyppi} />
</div>
<div>
    number: <input
           value = {newNumber}
           onChange={handlaaNumba} />
</div>
<div><button type="submit">Add</button></div>
</form>
    )

export default PersonForm