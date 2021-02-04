
let elevator_id = 1
let floor_request_button_id = 1
let call_button_id = 1
let door_id = 1

//my column class
class Column {

    constructor(_id, _status, _amountOfFloors, _amountOfElevator){
        this.elevator_list = []
        this.call_button_list = []
        this.id = _id
        this.status = _status
        this.amount_of_floors = _amountOfFloors
        this.amount_of_elevator = _amountOfElevator

        this.createCallButtons(_amountOfFloors)
        this.createElevators(_amountOfElevator, _amountOfFloors)
    }
    // method for making my call buttons
    createCallButtons( _amountOfFloors){
        let number_of_floor = _amountOfFloors
        let button_floor = 1
        
        for(let i = 0; i< number_of_floor; i++){
            if (button_floor < _amountOfFloors){
                let call_button =new CallButton(call_button_id, "off", button_floor, "up")
                this.call_button_list.push(call_button)
                call_button_id ++
            }
            if (button_floor > 1){
               let call_button = new CallButton(call_button_id, "off", button_floor, "down")
               this.call_button_list.push(call_button)
               call_button_id ++
            }
            
            button_floor ++
        }
    }
    // method for making my elevators
    createElevators( _amountOfElevator, _amountOfFloors){
        let number_of_elevator = _amountOfElevator
        for(let i = 0; i < number_of_elevator; i++){
            let elevator = new Elevator(elevator_id, "idle", _amountOfFloors, 1)
            this.elevator_list.push(elevator)
            elevator_id ++
        }
    }
    //function that will call elevator to the floor your on
    requestElevator(floor, direction){
        let elevator = this.findElevator(floor, direction)
        console.log(elevator)
        elevator.floor_request_list.push(floor)
        elevator.sortFloorList()
        elevator.move()
        elevator.operateDoors()
        return elevator
    }

     //send point to each elevator to find the best one   
    findElevator(floor, direction){
        let bestElevatorInformation = {
            bestElevator: null,
            bestScore: 5,
            referenceGap: 10000000}
        

        this.elevator_list.forEach(elevator => {
            if (floor == elevator.position && elevator.status == "idle"){
                bestElevatorInformation = this.checkIfElevatorIsBetter(1, elevator, bestElevatorInformation, floor)
            }else if (floor > elevator.position && elevator.direction == "up" && direction == elevator.direction){
                bestElevatorInformation = this.checkIfElevatorIsBetter(2, elevator, bestElevatorInformation, floor)
            }else if (floor < elevator.position && elevator.direction == "down" && direction == elevator.direction){
                bestElevatorInformation = this.checkIfElevatorIsBetter(2, elevator, bestElevatorInformation, floor)
            }else if (elevator.status == "idle"){
                bestElevatorInformation = this.checkIfElevatorIsBetter(3, elevator, bestElevatorInformation, floor)
            }else{
                bestElevatorInformation = this.checkIfElevatorIsBetter(4, elevator, bestElevatorInformation, floor)
            }
            
        })
        return bestElevatorInformation.bestElevator
    }
    
            
    
    //use point to check witch elevator is better
    checkIfElevatorIsBetter(scoreToCheck, newElevator, bestElevatorInformation, floor) {
        if (scoreToCheck < bestElevatorInformation.bestScore){
            bestElevatorInformation.bestScore = scoreToCheck
            bestElevatorInformation.bestElevator = newElevator
            bestElevatorInformation.referenceGap = Math.abs(newElevator.position - floor)

        }else if (bestElevatorInformation.bestScore == scoreToCheck){
            let gap = Math.abs(newElevator.position - floor)
            if (bestElevatorInformation.referenceGap > gap){
                bestElevatorInformation.bestElevator = newElevator
                bestElevatorInformation.referenceGap = gap
            }
        }
            
        return bestElevatorInformation
    }
    checkRequestList(){  //only use for senario 3 
        this.elevator_list.forEach(elevator => {
            if (elevator.floor_request_list != []){
                elevator.sortFloorList()
                elevator.move()
                elevator.operateDoors()
            }
        })
    }

}
class CallButton{
    constructor(_id, _status, _floor, _direction){
        this.id = _id
        this.status = _status
        this.floor = _floor
        this.direction = _direction
    }

}
class Elevator{
    constructor(_id, _status, _amountOfFloors, _currentFloor){
        this.id = _id
        this.status = _status
        this.direction = "null"
        this.amount_of_floor = _amountOfFloors
        this.position = _currentFloor
        this.door = new Door(door_id, "close")
        this.floor_request_button = []
        this.floor_request_list = []

        this.createFloorRequestButton(_amountOfFloors)
    }
    //making my button in each elevator made
    createFloorRequestButton( _amountOfFloors){
        let button_floor = 1
        for(let i = 0; i < _amountOfFloors; i++){
            let floorRequestButton = new FloorRequestButton(i + 1, "off", button_floor)
            this.floor_request_button.push(floorRequestButton)
            
            button_floor += 1
        }
    }
    //requesting a floor once inside elevator
    requestFloor(floor){
        this.floor_request_list.push(floor)
        this.sortFloorList()
        this.move()
        this.operateDoors()
    }
        
        
    //move the elevator in the right direction
    move(){
        while (this.floor_request_list.length != 0){
            let destination = this.floor_request_list[0]
            this.status = "moving"
            console.log("elevator" + this.id + " is moving")
            if (this.position < destination){
                console.log("elevator going up")
                this.direction = "up"
                while (this.position < destination){
                    this.position ++ 
                    console.log("elevator" + this.id + " moving to floor" + this.position,)
                }
            }else if (this.position > destination){
                console.log("elevator going down")
                this.direction = "down"
                while (this.position > destination){
                    this.position --
                    console.log("elevator" + this.id + " moving to floor" + this.position,)
                }
            }
            this.status = "idle"
            this.direction = "null"
            console.log("elevator " + this.id + " is stopped" )
            this.floor_request_list.shift()
            
        }
    }
    //sort my floor list
    sortFloorList(){
        if (this.direction == "up"){
            this.floor_request_list.sort(function(a, b){return a-b});
        }else{
            this.floor_request_list.sort(function(a, b){return b-a});
        }
    }
    //open door and close after 5 sec
    operateDoors(){
        this.door.status = "open"
        console.log(this.door.status + "door")
        console.log("please wait 5 seconds")
        this.door.status = "close"
        console.log(this.door.status + "door")
    }
}


class Door{
    constructor(_id, _status){
        this.id = _id
        this.status = _status
    }
}

class FloorRequestButton{
    constructor(_id, _status, _floor){
        this.id = _id
        this.status = _status
        this.floor = _floor
    }
}





function senario1(){
    let C1 = new Column(1, "online", 10, 2)
    C1.elevator_list[0].position = 2
    C1.elevator_list[1].position = 6
    let scenario = C1.requestElevator(3, "up")
    scenario.requestFloor(7)
}
    
function senario2(){
    let C1 = new Column(1, "online", 10, 2)
    C1.elevator_list[0].position = 10
    C1.elevator_list[1].position = 3
    let scenario = C1.requestElevator(1, "up")
    scenario.requestFloor(6)
    scenario = C1.requestElevator(3, "up")
    scenario.requestFloor(5)
    scenario = C1.requestElevator(9, "down")
    scenario.requestFloor(2)
}
 

function senario3(){
    let C1 = new Column(1, "online", 10, 2)
    C1.elevator_list[0].position = 10
    C1.elevator_list[1].position = 3
    C1.elevator_list[1].status = "moving"
    C1.elevator_list[1].floor_request_list.push(6)
    let scenario = C1.requestElevator(3, "down")
    scenario.requestFloor(2)
    C1.checkRequestList()
    scenario = C1.requestElevator(10, "down")
    scenario.requestFloor(3)
}
module.exports = {Column, Elevator, CallButton, FloorRequestButton, Door}