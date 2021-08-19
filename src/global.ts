declare global {
    interface Window {
        analytics: SegmentAnalytics.AnalyticsJS;
        Intercom: any;
    }
}

export default {};
