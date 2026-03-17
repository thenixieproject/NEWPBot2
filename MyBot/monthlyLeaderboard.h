#ifndef MONTHLYLEADERBOARD_H
#define MONTHLYLEADERBOARD_H

#include <string>

class monthlyLeaderboard {
public:
	void createLeaderboard();
	void displayLeaderboard();
	void contribute(std::string systemName, std::string activity, int amount);
};

#endif //MONTHLYLEADERBOARD_H
