import { SpanStatusCode, trace } from '@opentelemetry/api';
import { PostgrestError } from '@supabase/supabase-js';
import colors from 'colors';
import winston, { format } from 'winston';
import 'winston-daily-rotate-file';
import DailyRotateFile from 'winston-daily-rotate-file';
import { ConsoleTransportInstance } from 'winston/lib/winston/transports';

colors.enable();

//const pm2Metrics = {
//	guilds: io.metric({
//		name: 'Guilds',
//	}),
//	shards: io.metric({
//		name: 'Shards',
//	}),
//};

/** @enum {string} Labels for logging */
enum LogLabel {
	MySQL = '🐬',
	Postgres = '🐘',
	MariaDB = '🦭',
	Supabase = '🚀',
	Shard = '🔮',
	Users = '👤',
	Commands = '🔧',
	Events = '🚨',
	DataSync = '🔄',
}

const dbError = new winston.transports.DailyRotateFile({
	// This is for today
	level: 'Error',
	datePattern: 'YYYY-MM-DD',
	maxFiles: '5d',
	filename: 'logs/db/%DATE% db error.log',
	format: winston.format.combine(
		format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss',
		}),
		format.errors({ stack: true }),
		format.splat(),
		format.json()
	),
});

const consoleTransport = new winston.transports.Console({
	level: 'debug',
	format: winston.format.combine(
		format.cli({
			colors: {
				error: 'red',
				warn: 'yellow',
				info: 'cyan',
				debug: 'gray',
			},
		}),
		format.label(),
		format.errors({ stack: true }),
		format.splat()
		//format.printf(({ level, message }: { level: any; message: any }) => {
		//	const date = new Date().toISOString();
		//	return `[${date.slice(0, 19).replace('T', ' ')}] [${level}] ${label} ${message}`;
		//})
	),
});

const debugTransport = new winston.transports.DailyRotateFile({
	level: 'debug',
	maxFiles: '2d',
	maxSize: '2m',
	format: winston.format.combine(
		format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss',
		}),
		format.errors({ stack: true }),
		format.splat(),
		format.json()
	),
	filename: 'logs/%DATE% level4.log',
	datePattern: 'YYYY-MM-DD',
});
debugTransport.on('error', function (err: Error) {
	loggit.error('Error: ' + err);
});

const infoTransport = new winston.transports.DailyRotateFile({
	level: 'Information',
	maxFiles: '7d',
	format: winston.format.combine(
		format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss',
		}),
		format.errors({ stack: true }),
		format.splat(),
		format.json()
	),
	filename: 'logs/%DATE% level3.log',
	datePattern: 'YYYY-MM-DD',
});
infoTransport.on('error', function (err: Error) {
	loggit.error('Error: ' + err);
});

const warnTransport = new winston.transports.DailyRotateFile({
	level: 'warn',
	maxFiles: '14d',
	utc: true,
	format: winston.format.combine(
		format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss',
		}),
		format.errors({ stack: true }),
		format.splat(),
		format.json()
	),
	filename: 'logs/%DATE% level2.log',
	datePattern: 'YYYY-MM-DD',
});
warnTransport.on('error', function (err) {
	loggit.error('Error: ' + err);
});

const errorTransport = new winston.transports.DailyRotateFile({
	level: 'Error',
	maxFiles: '14d',
	format: winston.format.combine(
		format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss',
		}),
		format.errors({ stack: true }),
		format.splat(),
		format.json()
	),
	filename: 'logs/%DATE% level1.log',
	datePattern: 'YYYY-MM-DD',
});
errorTransport.on('error', function (err: Error) {
	loggit.error('Error: ' + err);
});

const userLogYear = new winston.transports.DailyRotateFile({
	// This is for this year
	level: 'Information',
	datePattern: 'YYYY',
	filename: 'logs/users/%DATE% users.log',
	format: winston.format.combine(
		format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss',
		}),
		format.errors({ stack: true }),
		format.splat(),
		format.json()
	),
});

const userLogMonth = new winston.transports.DailyRotateFile({
	// This is for this month
	level: 'Information',
	datePattern: 'YYYY-MM',
	filename: 'logs/users/%DATE% users.log',
	format: winston.format.combine(
		format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss',
		}),
		format.errors({ stack: true }),
		format.splat(),
		format.json()
	),
});

const userLogDay = new winston.transports.DailyRotateFile({
	// This is for today
	level: 'Information',
	datePattern: 'YYYY-MM-DD',
	filename: 'logs/users/%DATE% users.log',
	format: winston.format.combine(
		format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss',
		}),
		format.errors({ stack: true }),
		format.splat(),
		format.json()
	),
});
const dbLog = new winston.transports.DailyRotateFile({
	level: 'Information',
	datePattern: 'YYYY-MM-DD',
	maxFiles: '1',
	maxSize: '10k',
	filename: 'logs/db/%DATE% db log.log',
	format: winston.format.combine(
		format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss',
		}),
		format.errors({ stack: true }),
		format.splat(),
		format.json()
	),
});

const shardError = new winston.transports.DailyRotateFile({
	// This is for today
	level: 'Error',
	datePattern: 'YYYY-MM-DD',
	maxFiles: '3d',
	maxSize: '5k',
	filename: 'logs/shard/%DATE% shard error.log',
	format: winston.format.combine(
		format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss',
		}),
		format.errors({ stack: true }),
		format.splat(),
		format.json()
	),
});
const shardLog = new winston.transports.DailyRotateFile({
	level: 'Information',
	datePattern: 'YYYY-MM-DD',
	maxFiles: '1',
	maxSize: '2k',
	filename: 'logs/shard/%DATE% shard log.log',
	format: winston.format.combine(
		format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss',
		}),
		format.errors({ stack: true }),
		format.splat(),
		format.json()
	),
});

const transports = {
	dbError,
	dbLog,
	errorTransport,
	consoleTransport,
	infoTransport,
	warnTransport,
	debugTransport,
	userLogYear,
	userLogMonth,
	userLogDay,
	shardError,
	shardLog,
};

const LogLevels = {
	Error: 'error',
	Warning: 'warn',
	Information: 'info',
	Http: 'http',
	Verbose: 'verbose',
	Debug: 'debug',
	Silly: 'silly',
};

export type LogLevels = keyof typeof LogLevels;

const logger = winston.createLogger({
	level: 'debug',
	transports: [
		transports.infoTransport,
		transports.warnTransport,
		transports.errorTransport,
		transports.consoleTransport,
	],
});

const userLog = winston.createLogger({
	level: 'Information',
	transports: [transports.userLogDay, transports.userLogMonth, transports.userLogYear],
});

/** @enum {string} LogLevel for
 * @member Error to pur
 */

type logOptions = {
	level: LogLevels;
	message: string | Error | PostgrestError;
	transports?: Array<DailyRotateFile | ConsoleTransportInstance>;
	timestamp?: Date | string;
	label?: LogLabel;
};

class Loggit {
	constructor() {
		// Initialize the logger
	}

	async log(options: logOptions) {
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

		let consoleLog = '';

		if (options.level == 'Error') {
			consoleLog += colors.bgRed('ERROR') + ' ';
		} else if (options.level == 'Warning') {
			consoleLog += colors.bgYellow('WARN') + ' ';
		} else if (options.level == 'Verbose') {
			consoleLog += colors.bgCyan('VERB') + ' ';
		} else if (options.level == 'Information') {
			consoleLog += colors.bgBlue('INFO') + ' ';
		} else if (options.level == 'Debug') {
			consoleLog += colors.bgWhite('DEBUG') + ' ';
		} else if (options.level == 'Silly') {
			consoleLog += colors.rainbow('SILLY') + ' ';
		} else {
			consoleLog += colors.gray(options.level);
		}

		switch (options.label) {
			case LogLabel.Supabase:
				consoleLog += LogLabel.Supabase + ' ';
				break;
			case LogLabel.Postgres:
				consoleLog += LogLabel.Postgres + ' ';
				break;
			case LogLabel.MySQL:
				consoleLog += LogLabel.MySQL + ' ';
				break;

			default:
				break;
		}

		consoleLog += options.message + ' ';
		consoleLog += colors.bgWhite(colors.black(options.timestamp)) + ' ';

		if (!options.transports) {
			options.transports = [transports.consoleTransport];
		}
		if (options.transports?.includes(transports.consoleTransport)) {
			if (options.level == 'Error') {
				console.error(consoleLog);
			} else if (options.level == 'Information') {
				console.log(consoleLog);
			}
		}
	}

	async debug(message: string) {
		this.log({
			level: 'Debug',
			message,
		});
	}

	async info(message: string) {
		this.log({
			level: 'Information',
			message,
			transports: [transports.consoleTransport, transports.infoTransport],
		});
	}

	async warn(message: string | Error) {
		this.log({
			level: 'Warning',
			message,
			transports: [transports.consoleTransport, transports.warnTransport],
		});
	}

	async error(message: string | Error | PostgrestError) {
		this.log({
			level: 'Error',
			message,
			transports: [
				transports.consoleTransport,
				transports.errorTransport,
				transports.infoTransport,
			],
		});

		try {
			const tracer = trace.getTracer('campmaster.logger');
			const span = tracer.startSpan('logger.error', {
				attributes: {
					'logger.level': 'error',
					'logger.message.type': typeof message,
				},
			});
			try {
				if (message instanceof Error) {
					span.recordException(message);
					span.setStatus({
						code: SpanStatusCode.ERROR,
						message: message.message,
					});
				} else if (message && typeof message === 'object') {
					// for PostgrestError or other error-like objects
					span.recordException(new Error(JSON.stringify(message)));
					span.setStatus({
						code: SpanStatusCode.ERROR,
						message: JSON.stringify(message),
					});
				} else {
					span.addEvent('log.message', { message: String(message) });
					span.setStatus({
						code: SpanStatusCode.ERROR,
						message: String(message),
					});
				}
			} finally {
				span.end();
			}
		} catch (otErr) {
			// OpenTelemetry not configured or failed — don't block logging
			// eslint-disable-next-line no-console
			console.warn('OpenTelemetry disabled or failed to record span', otErr);
		}
	}

	async verbose(message: string) {
		this.log({
			level: 'Verbose',
			message,
			transports: [transports.consoleTransport],
		});
	}

	async silly(message: string) {
		this.log({
			level: 'Silly',
			message,
			transports: [transports.consoleTransport],
		});
	}

	transports = {
		console: transports.consoleTransport,
		error: transports.errorTransport,
		warn: transports.warnTransport,
		info: transports.infoTransport,
		debug: transports.debugTransport,
		dbLog: transports.dbLog,
		dbError: transports.dbError,
		userLogDay: transports.userLogDay,
		userLogMonth: transports.userLogMonth,
		userLogYear: transports.userLogYear,
		shardLog: transports.shardLog,
		shardError: transports.shardError,
	};

	LogLevel = {
		Error: 'error',
		Warning: 'warn',
		Information: 'info',
		Http: 'http',
		Verbose: 'verbose',
		Debug: 'debug',
		Silly: 'silly',
	};
}

const loggit = new Loggit();

loggit.log({
	level: 'Information',
	message: 'Logger initialized',
	transports: [loggit.transports.console],
});

export { dbLog, logger, loggit, LogLabel, logOptions, shardLog, userLog };
