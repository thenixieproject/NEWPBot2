// Library Inclusions
#include<dpp/dpp.h>

// Header Inclusions
#include"MyBot.h"
#include"cmdrClass.h"

// Global Constants
const std::string BOT_TOKEN = "MTQ4MTQ2NzY4NDEyMDk1MzAzNQ.GsvzZn.kr-GlGNkiXCuPSMuqEIEaFhkKgbbzKjk8nuZ5A";
const dpp::snowflake MY_GUILD_ID = 529089208254464001;

// Global Variables

// Function Prototypes

// Main Function
int main() {
	// Create a new bot cluster
	dpp::cluster bot(BOT_TOKEN);

	// Output log information to console
	bot.on_log(dpp::utility::cout_logger());

	/*
	// During testing, each command will need to be cleared as many will be added
	bot.on_ready([&bot](const dpp::ready_t& event) {
		if (dpp::run_once<struct clear_bot_commands>()) {
			bot.global_bulk_command_delete();
			bot.guild_bulk_command_delete(529089208254464001);
		}
		});
	*/

	// Handle slash commands
	bot.on_slashcommand([](const dpp::slashcommand_t& event) {
		// Check which command was used
		if (event.command.get_command_name() == "createnewuser") {
			// Fetch parameter value from command options
			dpp::snowflake user_id = std::get<dpp::snowflake>(event.get_parameter("user"));

			// Get member object from resolved list
			dpp::guild_member resolved_member = event.command.get_resolved_member(user_id);

			// Create a new cmdrClass object for that user, set ID, and rank.
			cmdrClass* cmdr = new cmdrClass();
			cmdr->setCmdrName(resolved_member.get_nickname());
			cmdr->setRank("Faction Ops");

			// Reply that a new event was created
			event.reply("Object for " + resolved_member.get_nickname() + " created.");
		}
	});

	// Register bot commands on ready
	bot.on_ready([&bot](const dpp::ready_t& event) {
		if (dpp::run_once<struct register_bot_commands>()) {
			// Register the command name
			dpp::slashcommand createnewuser("createnewuser", "Create a new user", bot.me.id);

			// Add command options
			createnewuser.add_option(dpp::command_option(dpp::co_user, "user", "user to create", true));

			// Create the command
			bot.global_command_create(createnewuser);
		}
	});

	// Start the bot
	bot.start(dpp::st_wait);
	
	return 0;
}

// Function Definitions
