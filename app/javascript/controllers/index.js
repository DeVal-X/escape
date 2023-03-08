// This file is auto-generated by ./bin/rails stimulus:manifest:update
// Run that command whenever you add a new controller or create them with
// ./bin/rails generate stimulus controllerName

import { application } from "./application"

import DoorOpeningController from "./door_opening_controller"
application.register("door-opening", DoorOpeningController)

import GameSubscriptionController from "./game_subscription_controller"
application.register("game-subscription", GameSubscriptionController)

import HelloController from "./hello_controller"
application.register("hello", HelloController)

import InstructionPaperController from "./instruction_paper_controller"
application.register("instruction-paper", InstructionPaperController)

import TotemSwitchController from "./totem_switch_controller"
application.register("totem-switch", TotemSwitchController)
