interface IStatistics {
	views: number;
	lastViewed: Date;
	visitors: {
		ip: string;
		userAgent: string;
		location: string;
		timestamp: Date;
	}[];
}
