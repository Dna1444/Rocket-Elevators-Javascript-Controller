================================================
                     COMPANY                   
================================================	
Rocket Elevators


================================================
                     AUTHOR                    
================================================
Dana Duquette


================================================
               PROGRAMMING SYSTEM              
================================================
JavaScript


================================================
                    SOFTWARE                   
================================================
Elevator Controller


================================================
                  DESCRIPTION                  
================================================
The purpose of this elevator control software is to control an elevator in such a way that it meets all the demands of building users.

1.  A user, on a random level of the building, will push a call button to request an elevator at his level.
2.  The system will find the best elevator to send depending of the user level, elevator position, direction and if it's already moving or not.
3.  The door will open to let the user and will close only if the elevator is not overweight or the doors are not obstructed. 
4.  The user will request a level and the elevator will move to the level.


================================================
                DESIGN & METHOD                     
================================================
The design is data-oriented. I started contemplating the required information in order for elevators to make good decisions. We arrived at the following data & method structure:

- class Column:				; Data required for the column using an id, status, amount of floors and amount of elevators.
	- createCallButtons		; Buttons per floor that will be used to request an Elevator.
	- createElevators		; Elevators are created inside the column.
	- requestElevator		; The operation to request and move the elevator to the user.
	- findElevator 			; A score system that will calculate which elevator should be sent.
	- checkIfElevatorIsBetter		; A comparing system to send the best elevator informations. 

- class Elevator:			; Data required for the elevator using an id, status, amount of floors and current floor.
	- def createFloorRequestButtons	; Buttons inside the elevator that will be used to request a floor.
	- def requestFloor		; The operation to request and move the elevator to the desired floor.
	- def move			; The operation of moving the elevator up or down as required.
	- def sortFloorList		; A function that sorts the list of floors in ascending or descending order according to the direction of the elevator.
	- def operateDoors		; The current operating state of the doors.

- class CallButton:			; Data required for the call button using an id, status, floor and direction.
- class FloorRequestButton:		; Data required for a floor request button using an id, status and floor.
- class Door:				; Data required using an id and status.


================================================
               SCENARIO - PRESET
================================================
Lines of code are required to output the information that will be displayed in the terminal. 

1. 	To know which elevator is chosen, we need to output the elevator ID from the requestElevator function.
	Write down this line of code right after we find out which elevator it is:
	



2. 	To know when the elevator is moving up or down, we need to output informations from the moving function.
	First we need to output the elevator ID to know which elevator is moving and secondly, the current floor
	of the elevator itself. Write down those line of code after we increment and decrement the current floor:
	
	

3. 	To see when the doors are opening and closing, we need to output the status of the doors itself from 
	the operateDoors function. Write down those line of code after the status "closing", "closed" and after
	this.oeperateDoors() after the "else" condition.



4. 	Finally, we need to create the scenario function to make our program doing something. At the end of the of our 
	program, we need to write down our scenario function.

	4.a: We create the column and give attributes.
	4.b: We can output the name of the scenario to see it when it start in the terminal.
	4.c: We have to say which floor the first elevator from the list of elevators is standing. 
	4.d: We have to say which floor the second elevator from the list of elevators is standing. 
	4.e: we create the elevator and giving some attributes.
	4.f: We output the information about where is the elevator, it current floor.
	4.g: We have to say which floor we want to go by using the requestFloor.



================================================
                     RUN IT
================================================

Open the folder where your file is placed by using : File/Open Folder (CTRL+O in Windows) (Command+O in MacOs)
Open your terminal and run that line of code:

	node residential_controller.js


================================================
                      END
================================================