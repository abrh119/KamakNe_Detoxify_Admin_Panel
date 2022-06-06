import { useState, useEffect } from 'react'
import CardStatisticsVerticalComponent from './card-statistics/card-stats-vertical'
import { Grid } from '@mui/material'
import { fetchStats } from 'utils/fetchQueries'
import { normalizeText } from '../../../utils/normalizeText'
import Poll from 'mdi-material-ui/Poll'

export default function _stats() {
  const [stats, setStats] = useState([])
  useEffect(() => {
    fetchStats(setStats)
  }, [])

  return (
    <Grid item xs={12}>
      <Grid container spacing={8}>
        {Object.keys(stats)?.map(stat => (
          <Grid item xs={4}>
            <CardStatisticsVerticalComponent
              stats={stats[stat]}
              icon={<Poll />}
              color='error'
              //   trendNumber={(stats[stat] / stats.totalDocs) * 100}
              title={normalizeText(stat)}
              subtitle={`${(stats[stat] / stats.total) * 100}%`}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}
