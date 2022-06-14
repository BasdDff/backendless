import React, {useEffect, useState} from 'react';
import Backendless from "backendless";

const Profile = () => {

    Backendless.serverURL = "https://eu-api.backendless.com";
    Backendless.initApp('F6AEC3F0-DD1B-1892-FF39-981B4FE4A300', '9A497D87-CCB0-4571-A3F0-0A9886ECDB0F');

    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [country, setCountry] = useState("")
    const [gender, setGender] = useState("")

    const [newName, setNewName] = useState(name)
    const [newAge, setNewAge] = useState(age)
    const [newCountry, setNewCountry] = useState(country)
    const [newGender, setNewGender] = useState(gender)

    useEffect(() => {
        Backendless.UserService.getCurrentUser().then((response: any) => {
            console.log(response)
            setName(response.name)
            setAge(response.age)
            setCountry(response.country)
            setGender(response.gender)
            setNewName(response.name)
            setNewAge(response.age)
            setNewCountry(response.country)
            setNewGender(response.gender)
        })
    }, [])

    const updateUser = () => {
        Backendless.UserService.update({
            objectId: "881E8985-FBD0-472A-A33A-EC145D8615BD",
            name: newName,
            age: newAge,
            country: newCountry,
            gender: newGender
        }).then((response: any) => {
            console.log(response)
        })

        // Backendless.UserService.login( login, password )
        //     .then( updateUser )
        //     .then( userUpdated )
        //     .catch( gotError ) );
    }

    // const saveGeoPoint = () => {
    //     // @ts-ignore
    //     const houstonTX = new Backendless.GeoPoint()
    //
    //     houstonTX.latitude = 29.76429
    //     houstonTX.longitude = -95.38370
    //     houstonTX.categories = ['cities']
    //     houstonTX.metadata = {
    //         city      : 'Houston',
    //         population: 2196000,
    //         photo     : 'https://upload.wikimedia.org/wikipedia/en/thumb/7/76/Houston_Collage.png/800px-Houston_Collage.png'
    //     }
    //
    //     return Backendless.Geo.savePoint(houstonTX)
    // }

    const [x, setX] = useState("")
    const [y, setY] = useState("")
    const [desc, setDesc] = useState("")

    const saveGeoPoint = () => {
        Backendless.Data.of("Place").save({location: `POINT (${x} ${y})`, description: desc}).then((response) => {

        }).catch((e) => {
            alert(e)
        })
    }

    return (
        <div style={{padding: "10px"}}>
            <div style={{margin: "10px"}}>
                Профиль
            </div>
            <div style={{border: "1px solid black", marginBottom: "10px", padding: "10px"}}>
                Имя
                <div>
                    {name}
                    <input value={newName} onChange={(e) => setNewName(e.target.value)}/>
                </div>
            </div>
            <div style={{border: "1px solid black", marginBottom: "10px", padding: "10px"}}>
                Возраст
                <div>
                    {age}
                    <input value={newAge} onChange={(e) => setNewAge(e.target.value)}/>
                </div>
            </div>
            <div style={{border: "1px solid black", marginBottom: "10px", padding: "10px"}}>
                Страна
                <div>
                    {country}
                    <input value={newCountry} onChange={(e) => setNewCountry(e.target.value)}/>
                </div>
            </div>
            <div style={{border: "1px solid black", marginBottom: "10px", padding: "10px"}}>
                Гендер
                <div>
                    {gender}
                    <input value={newGender} onChange={(e) => setNewGender(e.target.value)}/>
                </div>
            </div>
            <div>
                <button onClick={updateUser}>Update</button>
            </div>
            <div>
                <input placeholder="x" value={x} onChange={(e) => setX(e.target.value)}/>
                <input placeholder="y" value={y} onChange={(e) => setY(e.target.value)}/>
                <input placeholder="Описание" value={desc} onChange={(e) => setDesc(e.target.value)}/>
                <button onClick={saveGeoPoint}>Save geo</button>
            </div>
        </div>
    );
};

export default Profile;