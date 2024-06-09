import { TrackMetricsSchema } from '../schemas/track/TrackMetrics';
import axios from 'axios';

const API_URL: string = 'http://localhost:8080';

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function parseTrackMetrics(
  tracks: any,
): Promise<TrackMetricsSchema> {
  return {
    trackId: tracks.tkId,
    trackName: tracks.tkName,
    expertiseCount: tracks.expertiseCount,
    qualifierCount: tracks.qualifierCount,
    partnerCount: tracks.partnerCount,
    expertiseCompletedOnTime: tracks.avgExpertiseCompletionTime,
    qualifierCompletedOnTime: tracks.avgQualifierCompletionTime,
    expertiseCompletedOnPercentage: tracks.avgExpertiseCompletionPercentage,
    qualifierCompletedOnPercentage: tracks.avgQualifierCompletionPercentage,
    avgExpiredQualifiers: tracks.avgExpiredQualifiers,
    avgTrackCompletionPercentage: tracks.avgTrackCompletionPercentage,
    avgTrackCompletionTime: tracks.avgTrackCompletionTime,
  };
}

export async function mapTrackMetrics(
  tracks: any,
): Promise<TrackMetricsSchema[]> {
  return tracks
    ? await Promise.all(
        tracks.map(async (item: any) => await parseTrackMetrics(item)),
      )
    : [];
}

/* eslint-enable @typescript-eslint/no-explicit-any */
export async function getTrackMetrics(): Promise<TrackMetricsSchema[]> {
  const response = await axios.get(`${API_URL}/trackmetrics`);
  return await mapTrackMetrics(response.data);
}

export async function getTrackMetric(
  trackId: number,
): Promise<TrackMetricsSchema> {
  const response = await axios.get(`${API_URL}/trackmetrics/${trackId}`);
  return await parseTrackMetrics(response.data);
}
