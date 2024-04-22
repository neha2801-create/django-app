from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.core.exceptions import ObjectDoesNotExist
from .models import Note
from canvas.models import Canvas
import json
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
@require_http_methods(["POST"])
def create_note(request, canvas_order):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Authentication required'}, status=403)
    print("Order", canvas_order)
    try:
        data = json.loads(request.body)
        canvases = Canvas.objects.filter(user=request.user).order_by('created_at')
        if canvas_order > len(canvases) or canvas_order < 1:
            return JsonResponse({'error': 'Invalid canvas order'}, status=404)

        canvas = canvases[canvas_order - 1]
        title = canvas.title
        note = Note.objects.create(
            canvas=canvas,
            # notesBody=data.get('notesBody', ''),
            posX=data.get('posX'),
            posY=data.get('posY'),
            height=data.get('height'),
            width=data.get('width'),
            pinned=data.get('pinned'),
            color=data.get('color'),
        )
        return JsonResponse({'id': note.id, 'order': canvas_order, 'title': title}, status=201) # todo : return full note
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Bad request'}, status=400)

@csrf_exempt
@require_http_methods(["DELETE"])
def delete_note(request, note_order):
    try:
        data = json.loads(request.body)
        print(data)
        canvas_order = int(data.get('canvasId'))
        canvases = Canvas.objects.filter(user=request.user).order_by('created_at')
        # print("again ", canvas_order, canvases, len(canvases))
        # canvas = canvases[canvas_order-1]
        # print(canvases)
        try:
            canvas = canvases[canvas_order-1]
        except IndexError:
            return JsonResponse({"error": "No such canvas."}, status=404)
        # print("canvas ", canvas)
        notes = Note.objects.filter(canvas=canvas).order_by('created_at')
        print("check", note_order, notes, len(notes))
        try:
            note = notes[note_order-1]
        except IndexError:
            return JsonResponse({"error": "No such note."}, status=404)
        note.delete()
        return JsonResponse({"message": "Note deleted."}, status=200)
    except ObjectDoesNotExist:
        return JsonResponse({"error": "Note not found."}, status=404)

@csrf_exempt
@require_http_methods(["PUT"])
def update_note(request, note_order):
    try:
        data = json.loads(request.body)
        print(data)
        canvas_order = int(data.get('canvasId'))
        canvases = Canvas.objects.filter(user=request.user).order_by('created_at')
        try:
            canvas = canvases[canvas_order-1]
        except IndexError:
            return JsonResponse({"error": "No such canvas."}, status=404)
        print("canvas ", canvas)
        notes = Note.objects.filter(canvas=canvas).order_by('created_at')
        try:
            note = notes[note_order-1]
        except IndexError:
            return JsonResponse({"error": "No such note."}, status=404)

        note.notesBody = data.get('body', note.notesBody)
        note.posX = float(data.get('left', note.posX))
        note.posY = float(data.get('top', note.posY))
        note.height = float(data.get('height', note.height))
        note.width = float(data.get('width', note.width))
        # note.pinned = data.get('pinned', note.pinned)
        note.color = data.get('backgroundColor', note.color)
        note.save()
        return JsonResponse({"message": "Note updated successfully."}, status=200)
    except ObjectDoesNotExist:
        return JsonResponse({"error": "Note not found."}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

@csrf_exempt
@require_http_methods(["POST"])
def pin_note(request, note_id):
    try:
        note = Note.objects.get(id=note_id)
        note.pinned = not note.pinned  # Toggle the pinned status
        note.save()
        return JsonResponse({"message": "Note pinned status toggled successfully."}, status=200)
    except ObjectDoesNotExist:
        return JsonResponse({"error": "Note not found."}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)


@csrf_exempt
@require_http_methods(["GET"])
def get_notes(request, canvas_order):
    try:
        canvas_order = int(canvas_order)
        canvases = Canvas.objects.filter(user=request.user).order_by('created_at')
        try:
            canvas = canvases[canvas_order-1]
        except IndexError:
            return JsonResponse({"error": "No such canvas."}, status=404)

        notes = Note.objects.filter(canvas=canvas).order_by('created_at')

        notes_data = [{
            "id": index+1,
            "body": note.notesBody,
            "left": note.posX,
            "top": note.posY,
            "height": note.height,
            "width": note.width,
            "color": note.color
        } for index, note in enumerate(notes)]

        return JsonResponse({"notes": notes_data}, status=200, safe=False)
    except ObjectDoesNotExist:
        return JsonResponse({"error": "Canvas not found."}, status=404)
    except Exception as e:
        return JsonResponse({"error": f"An error occurred: {str(e)}"}, status=400)
