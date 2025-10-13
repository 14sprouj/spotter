import colors from 'colors';
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { ConsoleTransportInstance } from 'winston/lib/winston/transports';

const logTransports = {
	console: new winston.transports.Console(),
	file: {
		error: new DailyRotateFile({ filename: "logs/%DATE%-error.log", datePattern: "YYYY-MM-DD", level: "error", maxFiles: "28d" }),
		warn: new DailyRotateFile({ filename: "logs/%DATE%-warn.log", datePattern: "YYYY-MM-DD", level: "warn", maxFiles: "14d" }),
		info: new DailyRotateFile({ filename: "logs/%DATE%-info.log", datePattern: "YYYY-MM-DD", level: "info", maxFiles: "7d" }),
	}
};

enum Scope {
	APPLICATION = "application",
	SYSTEM = "system",
	USER = "user",
}

const logger = winston.createLogger({
	level: 'debug',
	transports: [
		logTransports.file.info,
		logTransports.file.warn,
		logTransports.file.error,
		logTransports.console,
	],
});

/** @enum {string} LogLevel for
 * @member Error to pur
 */
enum LogLevel {
	Error = 'error',
	Warning = 'warn',
	Information = 'info',
	Http = 'http',
	Verbose = 'verbose',
	Debug = 'debug',
	Silly = 'silly',
}

/** @enum {string} Labels for logging */
enum ScopeLogLabel {
	Shard = '🔮',
	Users = '👤',
	Commands = '🔧',
	Events = '🚨',
	DataSync = '🔄',
}

type logOptions = {
	level: LogLevel;
	message: string | Error;
	transports: Array<DailyRotateFile | ConsoleTransportInstance> | null;
	timestamp?: Date | string;
	label?: ScopeLogLabel;
};

function log(options: logOptions) {
	if (!options.timestamp) {
		options.timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
		options.timestamp += '.' + new Date().getMilliseconds();
	}
	if (options.timestamp instanceof Date) {
		options.timestamp = options.timestamp
			.toISOString()
			.slice(0, 19)
			.replace('T', ' ');
	}

	if (!options.transports) {
		options.transports = [logTransports.console];
		log({
			level: LogLevel.Warning,
			message: 'Previous log has no transport',
			transports: [logTransports.console],
		});
	}
	let consoleLog = '';

	if (options.level == LogLevel.Error) {
		consoleLog += colors.bgRed('ERROR') + ' ';
	} else if (options.level == LogLevel.Warning) {
		consoleLog += colors.bgYellow('WARN') + ' ';
	} else if (options.level == LogLevel.Verbose) {
		consoleLog += colors.bgCyan('VERB') + ' ';
	} else if (options.level == LogLevel.Information) {
		consoleLog += colors.bgBlue('INFO') + ' ';
	} else if (options.level == LogLevel.Debug) {
		consoleLog += colors.bgWhite('DEBUG') + ' ';
	} else if (options.level == LogLevel.Silly) {
		consoleLog += colors.rainbow('SILLY') + ' ';
	} else {
		consoleLog += colors.gray(options.level);
	}

	consoleLog += options.message + ' ';
	consoleLog += colors.bgWhite(colors.black(options.timestamp)) + ' ';

	if (options.transports?.includes(logTransports.console)) {
		if (options.level == LogLevel.Error) {
			console.error(consoleLog);
		} else if (options.level == LogLevel.Warning) {
			console.warn(consoleLog);
		} else if (options.level == LogLevel.Information) {
			console.log(consoleLog);
		} else if (options.level == LogLevel.Debug) {
			console.debug(consoleLog);
		}
	}
}
