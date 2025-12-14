export function getEmissionTypeBadgeVariant(type: string): string {
  switch (type) {
    case 'CO2':
      return 'bg-chart-co2/15 text-chart-co2 border-chart-co2/30';
    case 'N2O':
      return 'bg-chart-n2o/15 text-chart-n2o border-chart-n2o/30';
    case 'CH4':
      return 'bg-chart-ch4/15 text-chart-ch4 border-chart-ch4/30';
    default:
      return 'bg-muted text-muted-foreground';
  }
}

