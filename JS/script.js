const app = new Vue(
    {
        el: root,

        data: {

            currentSelectedChat: 0,
            newUserMessage: "",
            searchBar:"",
            pinnedMessage: "",
           
            contacts: [
                {
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: '_4',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: '_5',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudia',
                    avatar: '_6',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novit???',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico',
                    avatar: '_7',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che ?? il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Davide',
                    avatar: '_8',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho gi?? mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ]
        },

        methods:{

            getImgFullPath(indexOfContact){
               return './img/avatar' + this.contacts[indexOfContact].avatar + '.jpg';
            },

            chatSelection(indexOfContact){
                this.currentSelectedChat = indexOfContact;
            },

            addNewMessage(){
                this.contacts[this.currentSelectedChat].messages.push({
                    date: this.getDateAndTime(),
                    message: this.newUserMessage,
                    status: 'sent'
                });
                this.newUserMessage = "";

                setTimeout(this.respondingAI, 1000)

            },

            respondingAI(){

                this.contacts[this.currentSelectedChat].messages.push({
                    date: this.getDateAndTime(),
                    message: "Ok!",
                    status: 'received'
                });
            },

            searchContact() {

                const lowercaseSearchedWord = this.searchBar.toLowerCase();
                
                for (let i = 0; i < this.contacts.length; i++) {
                   
                    const lowercaseContactName = this.contacts[i].name.toLowerCase();

                    if(lowercaseSearchedWord === ""){
                        this.contacts[i].visible = true;
                    } else {
                        if (lowercaseContactName.includes(lowercaseSearchedWord)) {
                            this.contacts[i].visible = true;
                        } else {
                            this.contacts[i].visible = false;
                        }
                    }
                }
            },

            deleteMessage(indexToDelete){
                this.contacts[this.currentSelectedChat].messages.splice(indexToDelete, 1);
            },

            pinMessage(indexOf){
                let newPinnedMessage = `${this.contacts[this.currentSelectedChat].messages[indexOf].date} - 
                                        ${this.contacts[this.currentSelectedChat].name} -
                                        ${this.contacts[this.currentSelectedChat].messages[indexOf].message}`
                this.pinnedMessage = newPinnedMessage;

            },

            getDateAndTime(){
                const today = new Date();

                const date = ` ${today.getDate()}/${(today.getMonth() + 1)}/${today.getFullYear()}`;
                console.log(date);

                const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
                console.log(time);

                return date + " " + time;
            },

            getLastMessage(index){
                const takeMessage = this.contacts[index].messages;

                const takeLastMessage = takeMessage[takeMessage.length -1];
                
                const lastMessage = takeLastMessage.message;

                if (takeMessage.length === 1) {
                    takeMessage.push({
                        date: "",
                        message: "",
                        status: ""
                    })
                };

                return lastMessage + " " + takeLastMessage.date;
            }
        }
    }
)