Currently, in the Postgres database, Moments are related to Channels using the channels_moments table.
Each moment is related to a single channel in this table.

We assume that the API discovers the channel that it needs to use for a moment using this table.
On the API, you can go to /api/moments/# to view the content of the moment with momentId # in the API.
This is the content that is sent to app.exploreapollo.org.

Here is an example:

{"id":1,"description":"Lunar Landing Sequence Initiated","title":"Landing sequence start","metStart":735668330,
"metEnd":735817573,"name":"landing-sequence-start","audioUrl":"https://exploreapollo-audiocache.s3.amazonaws.com/1455021031-moment_1.mp4",
"mission":{"id":1,"title":"Apollo 11","name":"apollo-11","start_date":"1969-07-16T12:32:00.000Z","start_time":-14556480},"media":[]}

Moment relates to the channel ID, which relates to an audio cache item.
When reading the moments from the database, it seems the API is obtaining the audio
correctly by comparing the channel, met_start, met_end, and file format. (See: exploreapollo-api/app/models/audio_cache_item.rb)
In exploreapollo-api/app/serializers/moment_serializer.rb, you can trace how the moments are set up.

Due to this complexity, it is difficult to see exactly how one would need to add for the ability to relate multiple channels.

(\*) Note, the audio_cache_items table in Postgres is the audio that seems to be used on the app.exploreapollo.org website.
This table does actually support use of multiple channels. If the audio segments referenced in S3 have all channels
available in the clips, you could try adding more channel IDs to this list of channels for each audio segment.

Along with possibly the above, we believe that at the very least, the first steps are to:
(1) Add the audio from the different channels to S3 (unless the \* note above is true).
(2) Add the entry into audio_cache_items (maybe also into audio_segments?). - When you add the entry, need to ensure that the channel ID is correct. Note: channel IDs are different between missions.
(3) Add the relationship between that channel and the corresponding moment into the channels_moments table.
(4) Update the moment_serializer.rb file (and possibly functions/files it's dependent on) in exploreapollo-api to store
the list of audio urls instead of just one audio url.
(5) Update the app.exploreapollo.org to expect and receive multiple audio urls (this would be in the MomentViewer/index.js).
(5) Update the app.exploreapollo.org MomentViewer/index.js to create multiple MomentPlayers, each of which should be able to
play their corresponding audio at that point. - Note, syncing these may require more work.
