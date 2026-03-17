#ifndef CMDRCLASS_H
#define CMDRCLASS_H

#include <string>

class cmdrClass {
private:
	long userID;
	std::string rank;
protected:
	int bonds;
	int bounties;
	int exploration;
	int warEffort;
	int influence;
	int installationDefense;
	int murder;
	int paxFails;
	int warband;
	int blackmarket;
public:
	void createNewUser(long userID);
	void contribute(std::string systemName, std::string activity, int amount);
	void addToLeaderBoard();
};

#endif //CMDRCLASS_H
