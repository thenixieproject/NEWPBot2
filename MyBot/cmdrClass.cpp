#include <cstdlib>
#include <iostream>
#include <string>
#include "cmdrClass.h"

cmdrClass::createNewUser(long userID) {
	// Set object lifetime stats to 0
	bonds = 0;
	bounties = 0;
	exploration = 0;
	warEffort = 0;
	influence = 0;
	installationDefense = 0;
	murder = 0;
	paxFails = 0;
	warband = 0;
	blackMarket = 0;

	// Send a message on the ostream that a new user was created for the userID
}