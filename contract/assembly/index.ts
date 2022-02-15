

import { Context, logging, storage, PersistentMap } from 'near-sdk-as'

const recipientList = new PersistentMap<string, string[]> ('RL')
const totalSent  = new PersistentMap<string, i32[]>('TS')

export function addFunds(recipient: string, amount: i32):void{
    if(recipientList.contains(Context.sender)){
        //getting list of recipients who 
        let getList = recipientList.getSome(Context.sender);
        //get list of amounts sent to recipients
        let getTotals  = totalSent.getSome(Context.sender);

        logging.log("User exists within list updating values")
        //if recipient is on our list
        if(getList.includes(recipient)){
            let getIndex = getList.indexOf(recipient);
            //old total of recipient matched
            let oldTotal = getTotals.at(getIndex)
            //update new total and match to target recipient
            let newTotal = oldTotal + amount;
            getTotals[getIndex] = newTotal;
            totalSent.set(Context.sender, getTotals)        
        }
        //if the recipient isn't on our current list, add him/her
        else{
            getList.push(recipient);
            recipientList.set(Context.sender, getList);
            getTotals.push(amount);
            totalSent.set(Context.sender, getTotals)
        }
    }
    //of the recipient has never done a transaction in near
    else{
        logging.log("User doesnt't exist in our storage, adding to list")
        recipientList.set(Context.sender, [recipient]);
        totalSent.set(Context.sender, [amount])
    }
}

//function to display recipient data on the new component