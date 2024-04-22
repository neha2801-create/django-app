from django.shortcuts import render, redirect
from django.contrib.auth import get_user_model
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout, update_session_auth_hash
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import CustomUser
from django.contrib.auth.hashers import make_password
import json
from django.contrib.auth.decorators import login_required



def check(request):
    if request.user.is_authenticated:
        return JsonResponse({'message': 'User is authenticated'}, status=200)
    else:
        return JsonResponse({'message': 'User is not authenticated'}, status=200)

@csrf_exempt
def register(request):
    if request.user.is_authenticated:
        return redirect('index')
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print(request.body)
            user = CustomUser.objects.create(
                username=data['signUpUsername'],
                email=data['signUpEmail'],
                full_name=data['signUpFullName'],
                password=make_password(data['signUpPassword']),
                # profile_picture=data['signUpProfilePic'] # todo: check if data contains signupProfilepic key then only access it
            )
            user.save()
            username=data['signUpUsername']
            password=data['signUpPassword']

            user = authenticate(request, username=username, password=password)
            if user is not None:
                # print("login also")
                login(request, user)
            return JsonResponse({'message': 'User created successfully'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Invalid HTTP method'}, status=405)

@csrf_exempt
def loginPage(request):
    # print(request.user)
    # if request.user.is_authenticated:
    #     return redirect('index')
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')
            # print(email, password)
            User = get_user_model()
            try:
                username = User.objects.get(email=email) #get username from email
            except User.DoesNotExist:
                username = None
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                # print(request.user)
                return JsonResponse({'message': 'Login successful'}, status=200)
            else:
                return JsonResponse({'error': 'Invalid credentials'}, status=400)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Invalid HTTP method'}, status=405)

@csrf_exempt
def logoutUser(request):
    logout(request)
    return JsonResponse({'message': 'Logged out successfully'}, status=200)


@csrf_exempt
def delete(request):
    if request.method == 'DELETE':
        if request.user.is_authenticated:
            user = request.user
            user.delete()
            logout(request)  # Logs the user out
            return JsonResponse({"message": "Account deleted successfully"}, status=200)
        else:
            return JsonResponse({"message": "User not authenticated"}, status=403)
    else:
        return JsonResponse({"message": "Invalid request method"}, status=405)

@csrf_exempt
def update_password(request):
    if request.method == 'PUT':
        if request.user.is_authenticated:
            data = json.loads(request.body)
            user = request.user
            old_password = data.get('old_password')
            new_password = data.get('new_password')
            if authenticate(username=user.username, password=old_password):
                user.set_password(new_password)
                user.save()
                # Update session to prevent the user from being logged out
                update_session_auth_hash(request, user)
                return JsonResponse({'message': 'Password updated successfully'}, status=200)
            else:
                return JsonResponse({"message": "Old password is incorrect"}, status=400)
        else:
            return JsonResponse({"message": "User not authenticated"}, status=403)
    else:
        return JsonResponse({"message": "Invalid request method"}, status=405)


def forget_password(request):
    pass

@csrf_exempt
def active_users(request):
    query_set = CustomUser.objects.filter(status=CustomUser.Status.ONLINE).exclude(id=request.user.id).values('id', 'full_name')
    online_users = [
        {
            'id': index + 1,
            'name': user['full_name'],
        }
        for index, user in enumerate(query_set.values('id', 'full_name'))
    ]
    print("Online_users", online_users)
    return JsonResponse({'users': online_users}, status= 200)


@csrf_exempt
def toggleStatus(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Authentication required'}, status=403)
    data = json.loads(request.body)
    status = data.get('status')
    request.user.status = status
    request.user.save()
    return JsonResponse({'status': status}, status=200)