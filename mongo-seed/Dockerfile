FROM mongo

# COPY init.json /init.json
# CMD mongoimport --host mongo --db pmhealth --collection sggmaps --type json --file /init.json


# COPY overall_death_SGG_PM2_5_filter.csv /overall_death_SGG_PM2_5_filter.csv
# COPY overall_death_SD_PM2_5_filter.csv /overall_death_SD_PM2_5_filter.csv
# COPY PM2_5_SD_by_district.csv /PM2_5_SD_by_district.csv
# COPY PM2_5_SGG_by_district.csv /PM2_5_SGG_by_district.csv
# COPY bnd_sido_00_2013_simple_geo.json /bnd_sido_00_2013_simple_geo.json
# COPY bnd_sigungu_00_2012_0_5.json /bnd_sigungu_00_2012_0_5.json
# COPY overall_death_PM2_5_stats.csv /overall_death_PM2_5_stats.csv
# CMD mongoimport --host mongo -d pmhealth -c overalldeathsggs --type csv --headerline overall_death_SGG_PM2_5_filter.csv && mongoimport --host mongo -d pmhealth -c overalldeathsds --type csv --headerline overall_death_SD_PM2_5_filter.csv && mongoimport --host mongo -d pmhealth -c pm25sds --type csv --headerline PM2_5_SD_by_district.csv && mongoimport --host mongo -d pmhealth -c pm25sggs --type csv --headerline PM2_5_SGG_by_district.csv && mongoimport --host mongo -d pmhealth -c sdmaps --type csv --headerline bnd_sido_00_2013_simple_geo.json && mongoimport --host mongo -d pmhealth -c sggmaps bnd_sigungu_00_2012_0_5.json

# COPY overall_death_PM2_5_stats.csv /overall_death_PM2_5_stats.csv
# CMD mongoimport --host mongo -d pmhealth -c stats --type csv --headerline overall_death_PM2_5_stats.csv


# COPY PM2_5_SGG_group.csv /PM2_5_SGG_group.csv
# COPY bnd_sigungu_00_2012_0_5_divided_by_sgg.json /bnd_sigungu_00_2012_0_5_divided_by_sgg.json
# CMD mongoimport --host mongo -d pmhealth -c sggmaps_divided_by_sgg --type json bnd_sigungu_00_2012_0_5_divided_by_sgg.json --jsonArray 



# COPY bnd_sigungu_00_2012_0_5_divided_by_sido.json /bnd_sigungu_00_2012_0_5_divided_by_sido.json
# COPY bnd_sido_00_2016_1.json /bnd_sido_00_2016_1.json
# CMD mongoimport --host mongo -d pmhealth -c sdmaps --type json bnd_sido_00_2016_1.json || mongoimport --host mongo -d pmhealth -c sggmaps_sgg_sd --type json --file bnd_sigungu_00_2012_0_5_divided_by_sido.json --jsonArray

COPY bnd_sigungu_00_2012_filter_simple_0_5.json /bnd_sigungu_00_2012_filter_simple_0_5.json
COPY bnd_sido_00_2016_0_3.json /bnd_sido_00_2016_0_3.json
CMD mongoimport --host mongo -d pmhealth -c sdmaps --type json bnd_sido_00_2016_0_3.json || mongoimport --host mongo -d pmhealth -c sggmaps_sgg_sd --type json --file bnd_sigungu_00_2012_filter_simple_0_5.json