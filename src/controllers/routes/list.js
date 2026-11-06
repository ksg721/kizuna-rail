import { getAllRoutes, getListOfRegions, getListOfSeasons } from '../../models/model.js';

export default async (req, res) => {
    const regions = await getListOfRegions();
    const seasons = await getListOfSeasons();
    const query = {
        region: typeof req.query.region === 'string' ? req.query.region.toLowerCase() : '',
        season: typeof req.query.season === 'string' ? req.query.season.toLowerCase() : ''
    };

    const allRoutes = await getAllRoutes();
    const routes = allRoutes.filter(route => {
        const regionMatches = !query.region || query.region === 'all' || route.region.toLowerCase() === query.region;
        const seasonMatches = !query.season || query.season === 'all' || route.bestSeason.toLowerCase() === query.season;

        return regionMatches && seasonMatches;
    });

    res.render('routes/list', { 
        title: 'Scenic Train Routes',
        regions,
        routes,
        seasons,
        query
    });
};
