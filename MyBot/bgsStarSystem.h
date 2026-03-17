#ifndef BGSSTARSYSTEM_H
#define BGSSTARSYSTEM_H

// Library Inclusions
#include <string>

// Class Declaration
class bgsStarSystem {
private:
	int bonds;
	int bounties;
	int exploration;
	int warEffort;
	int influence;
	int installationDefense;
	int murder;
	int paxFails;
	int trade;
	int warband;
	int blackMarket;
public:
	void addSystemToBoard(std::string systemName);
	void removeSystemFromBoard(std::string systemName);
	void contribute(std::string systemName, std::string activity, int amount);
	void initializeBoard(long channelID);
};

#endif //BGSSTARSYSTEM_H