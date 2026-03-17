#ifndef POWERPLAYSTARSYSTEM_H
#define POWERPLAYSTARSYSTEM_H

// Library Inclusions
#include <string>

class powerplayStarSystem {
private:
	int merits;
	int acquisition;
	int reinforcement;
	int undermine;
public:
	void addSystemToBoard(std::string systemName);
	void removeSystemFromBoard(std::string systemName);
	void contribute(std::string systemName, std::string activity, int amount);
	void resetSystem(std::string systemName);
	void initializeBoard(long channelID);
	int calculateTotalMerits(int acquisition, int reinforcement, int undermine)
	{return acquisition + reinforcement + undermine;}
};

#endif //POWERPLAYSYSTEM_H