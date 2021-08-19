const track = (eventName: string, properties?: any) => {
    window.analytics.track(eventName, properties);
};

export const Segment = {
    track,
};
