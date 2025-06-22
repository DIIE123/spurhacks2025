from music21 import *
import copy

def convert_midi_to_xml(midi_path, quantize=True):
    original_score = converter.parse(midi_path)
    score = original_score.chordify()

    if quantize:
        score = score.quantize()

    left_hand = stream.Part()
    right_hand = stream.Part()
    left_hand.id = 'LH'
    right_hand.id = 'RH'

    piano = instrument.Piano()
    ts = meter.TimeSignature('4/4')
    tempo_mark = tempo.MetronomeMark(number=80)

    for part in [left_hand, right_hand]:
        part.insert(0, copy.deepcopy(piano))
        part.insert(0, copy.deepcopy(ts))
        part.insert(0, copy.deepcopy(tempo_mark))

    left_hand.insert(0, clef.BassClef())
    right_hand.insert(0, clef.TrebleClef())

    lh_voice = stream.Voice()
    rh_voice = stream.Voice()
    for elem in score.flat.notesAndRests:
        offset = round(elem.offset / 0.25) * 0.25
        duration = round(elem.quarterLength / 0.25) * 0.25

        if isinstance(elem, note.Note):
            n = copy.deepcopy(elem)
            n.offset = offset
            n.quarterLength = duration
            if n.pitch.midi < 60:
                lh_voice.insert(offset, n)
            else:
                rh_voice.insert(offset, n)

        elif isinstance(elem, chord.Chord):
            left_notes = [copy.deepcopy(n) for n in elem.notes if n.pitch.midi < 60]
            right_notes = [copy.deepcopy(n) for n in elem.notes if n.pitch.midi >= 60]

            if left_notes:
                c = chord.Chord(left_notes)
                c.offset = offset
                c.quarterLength = duration
                lh_voice.insert(offset, c)

            if right_notes:
                c = chord.Chord(right_notes)
                c.offset = offset
                c.quarterLength = duration
                rh_voice.insert(offset, c)

        elif isinstance(elem, note.Rest):
            r = note.Rest()
            r.offset = offset
            r.quarterLength = duration
            lh_voice.insert(offset, r)
            rh_voice.insert(offset, copy.deepcopy(r))

    left_hand.append(lh_voice)
    right_hand.append(rh_voice)

    piano_score = stream.Score()
    piano_score.insert(0, metadata.Metadata(title=midi_path[:-4]))
    piano_score.insert(0, right_hand)
    piano_score.insert(0, left_hand)

    piano_score.makeMeasures(inPlace=True)
    piano_score.makeNotation(inPlace=True)

    xml_path = midi_path[:-4] + "_clean_two_staff.xml"
    piano_score.write('musicxml', fp=xml_path)

    return xml_path