import React, {useEffect, useState} from 'react';
import Backendless from "backendless";
import set = Backendless.LocalCache.set;

const Friends = () => {

    Backendless.serverURL = "https://eu-api.backendless.com";
    Backendless.initApp('F6AEC3F0-DD1B-1892-FF39-981B4FE4A300', '9A497D87-CCB0-4571-A3F0-0A9886ECDB0F');

    const [users, setUsers] = useState<any>()
    const [user, setUser] = useState<any>()
    const [findUser, setFindUser] = useState<any>()
    const [id, setId] = useState("")

    useEffect(() => {
        Backendless.UserService.getCurrentUser().then(response => {
            setUser(response)
        })
        Backendless.Data.of("Users").find().then(response => setUsers(response))
    }, [])

    //console.log(user)
    //console.log(users)
    console.log(findUser)
    //console.log(id)

    const findById = () => {
        Backendless.Data.of("Users").findById({objectId: id}).then((response) => {
            setFindUser(response)
        })
    }

    return (
        <div style={{margin: "10px"}}>
            <div style={{marginBottom: "10px"}}>
                Друзья
            </div>
            {user?.friends.map((friend: { id: string, accept: boolean }) =>
                <div style={{padding: "10px", border: "1px solid black", marginBottom: "10px"}} key={friend.id}>
                    ID друга
                    {" " + friend.id}
                    <div>
                        Статус заявки
                        <div>
                            {friend.accept ? "В друзьях" : "Заявка отправлена"}
                        </div>
                    </div>
                    <div>
                        <button>Удалить</button>
                    </div>
                </div>
            )}
            <div>
                Найти / Добавить друга
                <input placeholder="Введите ID друга" value={id} onChange={(e) => setId(e.target.value)}/>
                <button onClick={findById}>Найти</button>
                <div>
                    <div>Имя {findUser.name} </div>
                    <div>Почта {findUser.email} </div>
                    <div>Гендер {findUser.gender} </div>
                    <button>Добавить в друзья </button>
                </div>
            </div>
        </div>
    );
};

export default Friends;