import envConfig from '../envconfig/envconfig.ts';
import { getIsoString } from './timestamp.ts';

enum LogLevel {
    DEBUG = 5,
    INFO = 4,
    WARN = 3,
    ERROR = 2,
    FATAL = 1
}

export interface ICustomLogger {
    debug(message: any): void;
    info(message: any): void;
    warn(message: any): void;
    error(message: any): void;
    fatal(message: any): void;
}

class DummyLogger implements ICustomLogger {
    debug(message: any): void {};
    info(message: any): void {};
    warn(message: any): void {};
    error(message: any): void {};
    fatal(message: any): void {};
}

class CustomLogger implements ICustomLogger {
    private readonly logging_level: LogLevel;

    constructor() {
        this.logging_level = envConfig.loggingLevel() as LogLevel;
    }

    private log(level: any, message: string): void {
        const timestamp = new Date().toISOString();
        console.log(`[${getIsoString()}] ${level}: ${message}`);
    }

    debug(message: any): void {
        if (this.logging_level >= LogLevel.DEBUG) {
            this.log('DEBUG', message);
        }
    }

    info(message: any): void {
        if (this.logging_level >= LogLevel.INFO) {
            this.log('INFO', message);
        }
    }

    warn(message: any): void {
        if (this.logging_level >= LogLevel.WARN) {
            this.log('WARN', message);
        }
    }

    error(message: any): void {
        if (this.logging_level >= LogLevel.ERROR) {
            this.log('ERROR', message);
        }
    }

    fatal(message: any): void {
        if (this.logging_level >= LogLevel.FATAL) {
            this.log('FATAL', message);
        }
    }
}

export const customLoggerInstance = new CustomLogger();
export const dummyLoggerInstance = new DummyLogger();